
export interface Schedule {
  enabled: boolean;
  startTime: string;
  endTime: string;
  days: string[];
}

export interface Light {
  id: string;
  name: string;
  zone: string;
  isOn: boolean;
  schedule?: Schedule;
  usageData: {
    hoursOn: number;
    energyUsed: number;
    switches: number;
  };
}

export interface Block {
  id: string;
  name: string;
  location: string;
  isOn: boolean;
  schedule?: Schedule;
  lights: Light[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  lastActive: string;
}

export const mockBlocks: Block[] = [
  {
    id: "block-1",
    name: "Building A",
    location: "North Wing, Floor 1",
    isOn: true,
    schedule: {
      enabled: true,
      startTime: "08:00",
      endTime: "18:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    lights: [
      {
        id: "light-1-1",
        name: "Light 1",
        zone: "Reception",
        isOn: true,
        schedule: {
          enabled: true,
          startTime: "08:00",
          endTime: "18:00",
          days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        },
        usageData: {
          hoursOn: 247,
          energyUsed: 123.5,
          switches: 85,
        },
      },
      {
        id: "light-1-2",
        name: "Light 2",
        zone: "Reception",
        isOn: true,
        usageData: {
          hoursOn: 230,
          energyUsed: 115,
          switches: 72,
        },
      },
      {
        id: "light-1-3",
        name: "Light 3",
        zone: "Meeting Room",
        isOn: false,
        usageData: {
          hoursOn: 120,
          energyUsed: 60,
          switches: 140,
        },
      },
      {
        id: "light-1-4",
        name: "Light 4",
        zone: "Meeting Room",
        isOn: false,
        usageData: {
          hoursOn: 115,
          energyUsed: 57.5,
          switches: 135,
        },
      },
      {
        id: "light-1-5",
        name: "Light 5",
        zone: "Corridor",
        isOn: true,
        usageData: {
          hoursOn: 300,
          energyUsed: 150,
          switches: 45,
        },
      },
      {
        id: "light-1-6",
        name: "Light 6",
        zone: "Corridor",
        isOn: true,
        usageData: {
          hoursOn: 300,
          energyUsed: 150,
          switches: 45,
        },
      },
      {
        id: "light-1-7",
        name: "Light 7",
        zone: "Office Area",
        isOn: true,
        usageData: {
          hoursOn: 280,
          energyUsed: 140,
          switches: 90,
        },
      },
      {
        id: "light-1-8",
        name: "Light 8",
        zone: "Office Area",
        isOn: true,
        usageData: {
          hoursOn: 280,
          energyUsed: 140,
          switches: 90,
        },
      },
      {
        id: "light-1-9",
        name: "Light 9",
        zone: "Office Area",
        isOn: true,
        usageData: {
          hoursOn: 280,
          energyUsed: 140,
          switches: 90,
        },
      },
      // Add more lights as needed to reach 30 lights per block
    ],
  },
  {
    id: "block-2",
    name: "Building B",
    location: "South Wing, Floor 2",
    isOn: false,
    lights: [
      {
        id: "light-2-1",
        name: "Light 1",
        zone: "Conference Room",
        isOn: false,
        usageData: {
          hoursOn: 180,
          energyUsed: 90,
          switches: 120,
        },
      },
      {
        id: "light-2-2",
        name: "Light 2",
        zone: "Conference Room",
        isOn: false,
        usageData: {
          hoursOn: 180,
          energyUsed: 90,
          switches: 120,
        },
      },
      {
        id: "light-2-3",
        name: "Light 3",
        zone: "Break Room",
        isOn: false,
        usageData: {
          hoursOn: 200,
          energyUsed: 100,
          switches: 150,
        },
      },
      {
        id: "light-2-4",
        name: "Light 4",
        zone: "Break Room",
        isOn: false,
        usageData: {
          hoursOn: 200,
          energyUsed: 100,
          switches: 150,
        },
      },
      {
        id: "light-2-5",
        name: "Light 5",
        zone: "Office Area",
        isOn: false,
        usageData: {
          hoursOn: 250,
          energyUsed: 125,
          switches: 80,
        },
      },
      {
        id: "light-2-6",
        name: "Light 6",
        zone: "Office Area",
        isOn: false,
        usageData: {
          hoursOn: 250,
          energyUsed: 125,
          switches: 80,
        },
      },
      // Add more lights as needed to reach 30 lights per block
    ],
  },
  // Add more blocks if needed
];

// Populate each block with 30 lights if they don't have enough
for (const block of mockBlocks) {
  const lightsToAdd = 30 - block.lights.length;
  if (lightsToAdd > 0) {
    for (let i = block.lights.length + 1; i <= 30; i++) {
      const zoneNumber = Math.floor((i - 1) / 5) + 1;
      block.lights.push({
        id: `light-${block.id}-${i}`,
        name: `Light ${i}`,
        zone: `Zone ${zoneNumber}`,
        isOn: block.isOn,
        usageData: {
          hoursOn: Math.floor(Math.random() * 300),
          energyUsed: Math.floor(Math.random() * 150),
          switches: Math.floor(Math.random() * 200),
        },
      });
    }
  }
}

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    lastActive: new Date().toISOString(),
  },
  {
    id: "user-2",
    name: "Standard User",
    email: "user@example.com",
    role: "user",
    status: "active",
    lastActive: new Date().toISOString(),
  },
  {
    id: "user-3",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    lastActive: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "user-4",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "inactive",
    lastActive: new Date(Date.now() - 604800000).toISOString(), // 1 week ago
  },
  {
    id: "user-5",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "admin",
    status: "active",
    lastActive: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
  },
  // Add more users as needed
];

// Mock analytics data
export const mockAnalytics = {
  lightUsage: {
    daily: [
      { name: "00:00", lights: 10, energy: 5 },
      { name: "03:00", lights: 8, energy: 4 },
      { name: "06:00", lights: 15, energy: 7.5 },
      { name: "09:00", lights: 40, energy: 20 },
      { name: "12:00", lights: 45, energy: 22.5 },
      { name: "15:00", lights: 42, energy: 21 },
      { name: "18:00", lights: 30, energy: 15 },
      { name: "21:00", lights: 20, energy: 10 },
    ],
    weekly: [
      { name: "Mon", lights: 120, energy: 60 },
      { name: "Tue", lights: 132, energy: 66 },
      { name: "Wed", lights: 145, energy: 72.5 },
      { name: "Thu", lights: 140, energy: 70 },
      { name: "Fri", lights: 138, energy: 69 },
      { name: "Sat", lights: 80, energy: 40 },
      { name: "Sun", lights: 70, energy: 35 },
    ],
    monthly: [
      { name: "Jan", lights: 3200, energy: 1600 },
      { name: "Feb", lights: 3100, energy: 1550 },
      { name: "Mar", lights: 3400, energy: 1700 },
      { name: "Apr", lights: 3300, energy: 1650 },
      { name: "May", lights: 3250, energy: 1625 },
      { name: "Jun", lights: 3500, energy: 1750 },
      { name: "Jul", lights: 3450, energy: 1725 },
      { name: "Aug", lights: 3600, energy: 1800 },
      { name: "Sep", lights: 3700, energy: 1850 },
      { name: "Oct", lights: 3650, energy: 1825 },
      { name: "Nov", lights: 3620, energy: 1810 },
      { name: "Dec", lights: 3700, energy: 1850 },
    ],
  },
  energyEfficiency: {
    daily: [
      { name: "00:00", lights: 50, energy: 75 },
      { name: "03:00", lights: 45, energy: 70 },
      { name: "06:00", lights: 60, energy: 80 },
      { name: "09:00", lights: 95, energy: 92 },
      { name: "12:00", lights: 92, energy: 90 },
      { name: "15:00", lights: 90, energy: 88 },
      { name: "18:00", lights: 85, energy: 85 },
      { name: "21:00", lights: 70, energy: 80 },
    ],
    weekly: [
      { name: "Mon", lights: 88, energy: 85 },
      { name: "Tue", lights: 90, energy: 87 },
      { name: "Wed", lights: 92, energy: 89 },
      { name: "Thu", lights: 91, energy: 88 },
      { name: "Fri", lights: 90, energy: 87 },
      { name: "Sat", lights: 85, energy: 82 },
      { name: "Sun", lights: 80, energy: 78 },
    ],
    monthly: [
      { name: "Jan", lights: 85, energy: 82 },
      { name: "Feb", lights: 86, energy: 83 },
      { name: "Mar", lights: 88, energy: 85 },
      { name: "Apr", lights: 87, energy: 84 },
      { name: "May", lights: 88, energy: 85 },
      { name: "Jun", lights: 90, energy: 87 },
      { name: "Jul", lights: 91, energy: 88 },
      { name: "Aug", lights: 92, energy: 89 },
      { name: "Sep", lights: 93, energy: 90 },
      { name: "Oct", lights: 92, energy: 89 },
      { name: "Nov", lights: 91, energy: 88 },
      { name: "Dec", lights: 92, energy: 89 },
    ],
  },
  blockComparison: {
    daily: [
      { name: "00:00", lights: 20, energy: 10 },
      { name: "03:00", lights: 15, energy: 7.5 },
      { name: "06:00", lights: 25, energy: 12.5 },
      { name: "09:00", lights: 60, energy: 30 },
      { name: "12:00", lights: 65, energy: 32.5 },
      { name: "15:00", lights: 62, energy: 31 },
      { name: "18:00", lights: 50, energy: 25 },
      { name: "21:00", lights: 30, energy: 15 },
    ],
    weekly: [
      { name: "Block A", lights: 145, energy: 72.5 },
      { name: "Block B", lights: 120, energy: 60 },
      { name: "Block C", lights: 135, energy: 67.5 },
      { name: "Block D", lights: 142, energy: 71 },
      { name: "Block E", lights: 138, energy: 69 },
    ],
    monthly: [
      { name: "Block A", lights: 4300, energy: 2150 },
      { name: "Block B", lights: 3800, energy: 1900 },
      { name: "Block C", lights: 4100, energy: 2050 },
      { name: "Block D", lights: 4250, energy: 2125 },
      { name: "Block E", lights: 4150, energy: 2075 },
    ],
  },
};
