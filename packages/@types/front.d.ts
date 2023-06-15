export {};
declare global {
  const google: {
    accounts: {
      oauth2: {
        initCodeClient: (arg0: {
          client_id: any;
          scope: string;
          ux_mode: string;
          redirect_uri: any;
          state: string;
        }) => any;
      };
    };
  };
  const blockies: {
    create: any;
  };
  const party: {
    confetti: any;
    sparkles: any;
  };
  interface Window {
    ethereum: any;
  }
}

declare global {
  namespace Front {
    export type Dialog =
      | "error"
      | "message"
      | "complete"
      | "confirm"
      | "action"
      | "wallet"
      | "vote";
  }
}
