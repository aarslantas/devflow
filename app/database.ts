interface Ticket {
  id: number;
  name: string;
  status: string;
  type: string;
}

const tickets: Ticket[] = [
  {
    id: 1,
    name: "Ticket 1",
    status: "open",
    type: "bug",
  },
  {
    id: 2,
    name: "Ticket 2",
    status: "closed",
    type: "feature",
  },
  {
    id: 3,
    name: "Ticket 3",
    status: "in-progress",
    type: "task",
  },
  {
    id: 4,
    name: "Ticket 4",
    status: "open",
    type: "bug",
  },
  {
    id: 5,
    name: "Ticket 5",
    status: "closed",
    type: "feature",
  },
  {
    id: 6,
    name: "Ticket 6",
    status: "in-progress",
    type: "task",
  },
  {
    id: 7,
    name: "Ticket 7",
    status: "open",
    type: "bug",
  },
  {
    id: 8,
    name: "Ticket 8",
    status: "closed",
    type: "feature",
  },
  {
    id: 9,
    name: "Ticket 9",
    status: "in-progress",
    type: "task",
  },
  {
    id: 10,
    name: "Ticket 10",
    status: "open",
    type: "bug",
  },
];

export default tickets;
