import {Service} from "../Service";

export interface GroupedServices {
  category: string;
  serviceCount: number;
  services: Service[];
}
