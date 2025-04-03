export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string; // Format "HH:mm"
  endTime: string;   // Format "HH:mm"
}

export interface Mechanic {
  _id: string;
  userId: string;
  name?: string;
  cv: string;
  schedule: DaySchedule[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailabilityCheck {
  mechanicId: string;
  isAvailable: boolean;
}
