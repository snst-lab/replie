interface PluginAgent {
  mobile: boolean;
  tablet: boolean;
  pc: boolean;
  IE: boolean;
  Edge: boolean;
  Chrome: boolean;
  Firefox: boolean;
  Safari: boolean;
}

class UserAgent implements PluginAgent {
  mobile = false;
  tablet = false;
  pc = false;
  IE = false;
  Edge = false;
  Chrome = false;
  Firefox = false;
  Safari = false;

  constructor() {
    if (process.client) {
      const agent = window.navigator.userAgent.toLowerCase();
      this.mobile = /(iphone|ipod|android.*mobile)/i.test(agent);
      this.tablet =
        /(ipad|kindle)/i.test(agent) ||
        (agent.includes("android") && !agent.includes("mobile"));
      this.pc = !(this.mobile || this.tablet);
      this.IE = agent.includes("msie") || agent.includes("trident");
      this.Edge = agent.includes("edge");
      this.Chrome = agent.includes("chrome");
      this.Firefox = agent.includes("firefox");
      this.Safari =
        agent.includes("safari") &&
        !agent.includes("chrome") &&
        !agent.includes("edge");
    }
  }
}

export const useAgent = () => new UserAgent();
