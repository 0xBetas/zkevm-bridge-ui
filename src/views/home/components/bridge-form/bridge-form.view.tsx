import { BigNumber, ethers } from "ethers";
import { FC, useCallback, useEffect, useState } from "react";

import { addCustomToken, getChainCustomTokens, removeCustomToken } from "src/adapters/storage";
import { ReactComponent as ArrowDown } from "src/assets/icons/arrow-down.svg";
import { ReactComponent as CaretDown } from "src/assets/icons/caret-down.svg";
import { getEtherToken, getEthereumCustomNativeToken, getZkevmNativeToken } from "src/constants";
import { useEnvContext } from "src/contexts/env.context";
import { useProvidersContext } from "src/contexts/providers.context";
import { useTokensContext } from "src/contexts/tokens.context";
import { AsyncTask, Chain, FormData, Token } from "src/domain";
import { useCallIfMounted } from "src/hooks/use-call-if-mounted";
import { isTokenEther, selectTokenAddress } from "src/utils/tokens";
import { isAsyncTaskDataAvailable } from "src/utils/types";
import { AmountInput } from "src/views/home/components/amount-input/amount-input.view";
import { useBridgeFormStyles } from "src/views/home/components/bridge-form/bridge-form.styles";
import { TokenSelector } from "src/views/home/components/token-selector/token-selector.view";
import { Button } from "src/views/shared/button/button.view";
import { Card } from "src/views/shared/card/card.view";
import { ChainList } from "src/views/shared/chain-list/chain-list.view";
import { ErrorMessage } from "src/views/shared/error-message/error-message.view";
import { Icon } from "src/views/shared/icon/icon.view";
import { Spinner } from "src/views/shared/spinner/spinner.view";
import { TokenBalance } from "src/views/shared/token-balance/token-balance.view";
import { Typography } from "src/views/shared/typography/typography.view";

interface BridgeFormProps {
  account: string;
  formData?: FormData;
  onResetForm: () => void;
  onSubmit: (formData: FormData) => void;
}

interface SelectedChains {
  from: Chain;
  to: Chain;
}

export const BridgeForm: FC<BridgeFormProps> = ({ account, formData, onResetForm, onSubmit }) => {
  const classes = useBridgeFormStyles();
  const callIfMounted = useCallIfMounted();
  const env = useEnvContext();
  const { getErc20TokenBalance, tokens: defaultTokens } = useTokensContext();
  const { connectedProvider } = useProvidersContext();
  const [balanceFrom, setBalanceFrom] = useState<AsyncTask<BigNumber, string>>({
    status: "pending",
  });
  const [balanceTo, setBalanceTo] = useState<AsyncTask<BigNumber, string>>({ status: "pending" });
  const [inputError, setInputError] = useState<string>();
  const [selectedChains, setSelectedChains] = useState<SelectedChains>();
  const [tokenFrom, setTokenFrom] = useState<Token>();
  const [tokenTo, setTokenTo] = useState<Token>();
  
  
  const [amount, setAmount] = useState<BigNumber>();
  const [chains, setChains] = useState<Chain[]>();
  const [tokens, setTokens] = useState<Token[]>();
  const [isTokenListOpen, setIsTokenListOpen] = useState(false);

  const onAmountInputChange = ({ amount, error }: { amount?: BigNumber; error?: string }) => {
    setAmount(amount);
    setInputError(error);
  };

  const onChainButtonClick = (from: Chain) => {
    if (env) {
      const to = env.chains.find((chain) => chain.key !== from.key);

      if (to) {
        setSelectedChains({ from, to });
        setChains(undefined);
        setAmount(undefined);
      }
    }
  };

  const onTokenDropdownClick = () => {
    // setIsTokenListOpen(true);
  };

  const onSelectToken = (token: Token) => {
    setTokenFrom(token);
    setIsTokenListOpen(false);
    setAmount(undefined);
  };

  const onCloseTokenSelector = () => {
    setIsTokenListOpen(false);
  };

  const onAddToken = (token: Token) => {
    if (tokens) {
      // We don't want to store the balance of the user in the local storage
      const { address, chainId, decimals, logoURI, name, symbol, wrappedToken } = token;

      addCustomToken({ address, chainId, decimals, logoURI, name, symbol, wrappedToken });
      setTokens([token, ...tokens]);
    }
  };

  const onRemoveToken = (tokenToRemove: Token) => {
    if (tokens) {
      removeCustomToken(tokenToRemove);
      setTokens(
        tokens.filter(
          (token) =>
            !(token.address === tokenToRemove.address && token.chainId === tokenToRemove.chainId)
        )
      );
      if (selectedChains && tokenToRemove.address === tokenFrom?.address) {
        setTokenFrom(getEtherToken(selectedChains.from));
      }
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedChains && tokenFrom && amount) {
      onSubmit({
        amount: amount,
        from: selectedChains.from,
        to: selectedChains.to,
        token: tokenFrom,
      });
    }
  };

  const getTokenBalance = useCallback(
    (token: Token, chain: Chain): Promise<BigNumber> => {

      if (isTokenEther(token)) {
        return chain.provider.getBalance(account);
      } else {

        const balance = getErc20TokenBalance({
          accountAddress: account,
          chain: chain,
          tokenAddress: token.address,
        });
        return balance;
      }
    },

    [account, getErc20TokenBalance]
  );

  useEffect(() => {
    // Load all the tokens for the selected chain without their balance
    if (env && selectedChains && defaultTokens) {
      const { from } = selectedChains;
      // const chainTokens = [...getChainCustomTokens(from), ...defaultTokens];
      if(selectedChains.from.key =="ethereum"){
        setTokenFrom(
          getEthereumCustomNativeToken(env.chains[0])
        );
        setTokens(
          [getEthereumCustomNativeToken(env.chains[0])]
        );

        return;
      }
      if(selectedChains.from.key =="polygon-zkevm"){
        setTokenFrom(
          getZkevmNativeToken(env.chains[1])
        );

        setTokens(
          [getZkevmNativeToken(env.chains[1])]
        );
        
        return;
      }


      // setTokens(
      //   chainTokens.map((token) => ({
      //     ...token,
      //     balance: {
      //       status: "pending",
      //     },
      //   }))
      // );
    }
  }, [defaultTokens, selectedChains, env]);

  // useEffect(() => {
  //   // Load the balances of all the tokens of the primary chain (from)
  //   const areTokensPending = tokens?.some((tkn) => tkn.balance?.status === "pending");

  //   if (selectedChains && tokens && areTokensPending) {
  //     const getUpdatedTokens = (tokens: Token[] | undefined, updatedToken: Token) =>
  //       tokens
  //         ? tokens.map((tkn) =>
  //             tkn.address === updatedToken.address && tkn.chainId === updatedToken.chainId
  //               ? updatedToken
  //               : tkn
  //           )
  //         : undefined;

  //     setTokens(() =>
  //       tokens.map((token: Token) => {
  //         getTokenBalance(token, selectedChains.from)
  //           .then((balance): void => {
  //             callIfMounted(() => {
  //               const updatedToken: Token = {
  //                 ...token,
  //                 balance: {
  //                   data: balance,
  //                   status: "successful",
  //                 },
  //               };

  //               setTokens((currentTokens) => getUpdatedTokens(currentTokens, updatedToken));
  //             });
  //           })
  //           .catch(() => {
  //             callIfMounted(() => {
  //               const updatedToken: Token = {
  //                 ...token,
  //                 balance: {
  //                   error: "Couldn't retrieve token balance",
  //                   status: "failed",
  //                 },
  //               };

  //               setTokens((currentTokens) => getUpdatedTokens(currentTokens, updatedToken));
  //             });
  //           });

  //         return { ...token, balance: { status: "loading" } };
  //       })
  //     );
  //   }
  // }, [callIfMounted, defaultTokens, getTokenBalance, selectedChains, tokens]);

  useEffect(() => {
    if(env){
      if(tokenFrom?.chainId == env.chains[0].chainId){
        setTokenTo(getZkevmNativeToken(env.chains[1]));
      }else{
        setTokenTo(getEthereumCustomNativeToken(env.chains[0]));
      }  
    }
  }, [tokenFrom, env])

  useEffect(() => {
    // Load the balance of the selected token in both networks
    if (env && selectedChains) {
      setBalanceFrom({ status: "loading" });
      setBalanceTo({ status: "loading" });
      let fromToken;
      let toToken;
      if(selectedChains.from.key == "ethereum"){
        fromToken = getEthereumCustomNativeToken(env.chains[0])
        toToken = getZkevmNativeToken(env.chains[1]);
      } else {
        console.log("-----------------2");
        fromToken = getZkevmNativeToken(env.chains[1]);
        toToken = getEthereumCustomNativeToken(env.chains[0])
        // console.log(fromToken, toToken);
      }


      // if(env && selectedChains.from.key == "polygon-zkevm" && token){
      //   fromToken = getEthereumCustomNativeToken(env.chains[0])
      //   toToken = getEtherToken(env.chains[1]);
      // }
      

      getTokenBalance(fromToken, selectedChains.from)
        .then((balance) =>
          callIfMounted(() => {
            setBalanceFrom({ data: balance, status: "successful" });
          })
        )
        .catch(() => {
          callIfMounted(() => {
            setBalanceFrom({ error: "Couldn't retrieve token balance", status: "failed" });
          });
        });

      // console.log("toToken---",toToken, selectedChains.to);

      getTokenBalance(toToken, selectedChains.to)
        .then((balance) =>
          callIfMounted(() => {
            console.log("------------getErc20TokenBalance", balance);

            setBalanceTo({ data: balance, status: "successful" });
          })
        )
        .catch(() => {
          callIfMounted(() => {
            setBalanceTo({ error: "Couldn't retrieve token balance", status: "failed" });
          });
        });

    }
  }, [callIfMounted, getTokenBalance, selectedChains, env]);

  useEffect(() => {
    // Load the default values after the network is changed
    if (env && connectedProvider.status === "successful" && formData === undefined) {
      const from = env.chains.find((chain) => chain.chainId === connectedProvider.data.chainId);
      const to = env.chains.find((chain) => chain.chainId !== connectedProvider.data.chainId);

      if (from && to) {
        setSelectedChains({ from, to });
        if(from.key == "ethereum"){
          setTokenFrom(getEthereumCustomNativeToken(from));
        }else{
          setTokenFrom(getZkevmNativeToken(from));
        }
      }
      setAmount(undefined);
    }
    // This prevents the form from being reset when coming back from BridgeConfirmation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedProvider, env]);

  useEffect(() => {
    // Load default form values
    if (formData) {
      setSelectedChains({ from: formData.from, to: formData.to });
      setTokenFrom(formData.token);
      setAmount(formData.amount);
      onResetForm();
    }
  }, [formData, onResetForm]);

  if (!env || !selectedChains || !tokens || !tokenFrom) {
    return (
      <div className={classes.spinner}>
        <Spinner />
      </div>
    );
  }

  return (
    <form className={classes.form} onSubmit={onFormSubmit}>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.leftBox}>
            <Typography type="body2">From</Typography>
            <button
              className={classes.fromChain}
              onClick={() => setChains(env.chains)}
              type="button"
            >
              <selectedChains.from.Icon />
              <Typography type="body1">{selectedChains.from.name}</Typography>
              <CaretDown />
            </button>
          </div>
          <div className={classes.rightBox}>
            <Typography type="body2">Balance</Typography>
            <TokenBalance
              spinnerSize={14}
              token={{ ...tokenFrom, balance: balanceFrom }}
              typographyProps={{ type: "body1" }}
            />
          </div>
        </div>
        <div className={`${classes.row} ${classes.middleRow}`}>
          <button className={classes.tokenSelector} onClick={onTokenDropdownClick} type="button">
            <Icon isRounded size={24} url={tokenFrom.logoURI} />
            <Typography type="h2">{tokenFrom.symbol}</Typography>
            <CaretDown />
          </button>
          <AmountInput
            balance={
              balanceFrom && isAsyncTaskDataAvailable(balanceFrom)
                ? balanceFrom.data
                : BigNumber.from(0)
            }
            onChange={onAmountInputChange}
            token={tokenFrom}
            value={amount}
          />
        </div>
      </Card>
      <div className={classes.arrowRow}>
        <ArrowDown className={classes.arrowDownIcon} />
      </div>
      <Card className={classes.card}>
        <div className={classes.row}>
          <div className={classes.leftBox}>
            <Typography type="body2">To</Typography>
            <div className={classes.toChain}>
              <selectedChains.to.Icon />
              <Typography type="body1">{selectedChains.to.name}</Typography>
            </div>
          </div>
          <div className={classes.rightBox}>
            <Typography type="body2">Balance</Typography>
            {tokenTo? (<TokenBalance
              spinnerSize={14}
              token={{ ...tokenTo, balance: balanceTo }}
              typographyProps={{ type: "body1" }}
            />): null}
          </div>
        </div>
      </Card>
      <div className={classes.button}>
        <Button disabled={!amount || amount.isZero() || inputError !== undefined} type="submit">
          Continue
        </Button>
        {amount && inputError && <ErrorMessage error={inputError} />}
      </div>
      {chains && (
        <ChainList
          chains={chains}
          onClick={onChainButtonClick}
          onClose={() => setChains(undefined)}
        />
      )}
      {isTokenListOpen && (
        <TokenSelector
          account={account}
          chains={selectedChains}
          onAddToken={onAddToken}
          onClose={onCloseTokenSelector}
          onRemoveToken={onRemoveToken}
          onSelectToken={onSelectToken}
          tokens={tokens}
        />
      )}
    </form>
  );
};
