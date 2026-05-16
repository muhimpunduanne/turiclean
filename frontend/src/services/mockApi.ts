import { delay } from '@/lib/utils';
import { mockNotifications } from '@/data/mockNotifications';
import { mockPayments, mockSchedules, servicePlans } from '@/data/mockPayments';
import { mockReports } from '@/data/mockReports';
import { mockTrucks } from '@/data/mockTrucks';
import { mockUsers } from '@/data/mockUsers';

export const mockApi = {
  async getReports() {
    await delay(250);
    return mockReports;
  },
  async getTrucks() {
    await delay(250);
    return mockTrucks;
  },
  async getPayments() {
    await delay(250);
    return mockPayments;
  },
  async getSchedules() {
    await delay(250);
    return mockSchedules;
  },
  async getUsers() {
    await delay(250);
    return mockUsers;
  },
  async getNotifications() {
    await delay(250);
    return mockNotifications;
  },
  async getServicePlans() {
    await delay(250);
    return servicePlans;
  },
};
