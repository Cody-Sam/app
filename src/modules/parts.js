// Sockets
const motherboard = {
  name: "Form Factor",
  slug: "form",
  options: [
    { name: "ATX", slug: "atx" },
    { name: "Micro ATX", slug: "micro atx" },
    { name: "Extended ATX", slug: "e-atx" },
  ],
};

const CPU = {
  name: "CPU Socket",
  slug: "cpu",
  options: [],
};

const GPU = {
  name: "GPU Socket",
  slug: "gpu",
  options: [],
};

const RAM = {
  name: "RAM type",
  slug: "ram",
  options: [
    {name: "DDR2", slug: "ddr2"},
    {name: "DDR3", slug: "ddr3"},
    {name: "DDR4", slug: "ddr4"},
    {name: "DDR5", slug: "ddr5"}
  ],
};

const sockets = [
  motherboard,
  CPU,
  GPU,
  RAM
]

// Parts

const parts = [
  { name: "Case", slug: "case", sockets: [ motherboard ] },
  { name: "Processor", slug: "cpu", sockets: [ CPU ] },
  { name: "Graphics Processor", slug: "gpu", sockets: [ GPU ] },
  {
    name: "Motherboard",
    slug: "motherboard",
    sockets: [ motherboard, CPU, GPU, RAM ],
  },
  { name: "Memory", slug: "ram", sockets: [RAM] },
  { name: "Storage", slug: "storage", sockets: [] },
  { name: "Case Cooling", slug: "case-cooling", sockets: [] },
  { name: "Processor Cooler", slug: "cpu-cooler", sockets: [] },
  { name: "Power Supply", slug: "psu", sockets: [] },
];

export default parts 
export {parts, sockets};
