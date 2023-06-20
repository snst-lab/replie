import { tools } from "@tools";
import { defineStore } from "pinia";

const useNotificationStore = defineStore("notification", {
  state: () => ({
    history: [] as Dto.Notification[],
    tooltip: {
      title: "",
      isShow: false,
    },
    polling: {} as NodeJS.Timeout,
  }),
  persist: {
    enabled: true,
    lifetime: "long",
    scope: "global",
  },
  getters: {
    unreadCount(state) {
      return state.history.filter((item) => item.unread).length;
    },
    newestTimestamp(state) {
      return state.history[0]?.createdAt ?? null;
    },
    oldestTimestamp(state) {
      return state.history[state.history.length - 1]?.createdAt ?? null;
    },
  },
  actions: {
    showTooltipOnLoad() {
      if (this.tooltip.title) {
        this.tooltip.isShow = true;
      }
      setTimeout(() => {
        this.clearTooltip();
      }, 3000);
    },
    clearTooltip() {
      this.tooltip.title = "";
      this.tooltip.isShow = false;
    },
    showTooltip(title: string) {
      this.tooltip.title = title;
      this.tooltip.isShow = true;
      this.pollingStop();
      setTimeout(() => {
        this.clearTooltip();
      }, 3000);
    },
    setTooltip(title: string) {
      this.tooltip.title = title;
    },
    unshiftHistory(notifications: Dto.Notification[]) {
      this.history.unshift(...notifications);
    },
    pushHistory(notifications: Dto.Notification[]) {
      this.history.push(...notifications);
    },
    async fetchNew() {
      const response = (await useQuery(
        "findManyNotification",
        this.history[0]
          ? {
              where: { createdAt: { gt: this.newestTimestamp } },
            }
          : {}
      )) as Dto.Notification[];
      if (response[0]) {
        await this.unshiftHistory(response);
        if (this.unreadCount > 0) {
          await tools.sleep(500);
          await this.showTooltip(`${this.unreadCount} 件の未読通知があります`);
        }
      }
      return [...this.history];
    },
    async fetchPast() {
      const { public: constants } = useRuntimeConfig();
      const { notificationsPerPage } = constants.number;
      if (this.history.length < notificationsPerPage) {
        return [];
      }
      const response = (await useQuery("findManyNotification", {
        where: { createdAt: { lt: this.oldestTimestamp } },
      })) as Dto.Notification[];
      if (response[0]) {
        await this.pushHistory(response);
      } else {
        window.scrollBy({
          top: -(1 / notificationsPerPage) * window.innerHeight,
          behavior: "smooth",
        });
      }
      return [...this.history];
    },
    async markRead(notificationId: string) {
      const response = (await useMutation("markReadNotification", {
        data: { id: notificationId },
      })) as Dto.Notification;
      const index = this.history.findIndex((item) => item.id === response.id);
      if (index !== -1) {
        this.history[index].unread = false;
      }
    },
    pollingStart() {
      this.polling = setInterval(async () => {
        await this.fetchNew();
      }, 20000);
    },
    pollingStop() {
      clearInterval(this.polling);
    },
    clearAll() {
      this.history = [];
    },
  },
});
export const $notification = () => useNotificationStore();
