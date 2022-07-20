// Sockets
const motherboard = {
  name: "Motherboard Form Factor",
  slug: "mb",
  options: [
    { name: "ATX", slug: "mb_atx" },
    { name: "Micro ATX", slug: "mb_micro" },
    { name: "Extended ATX", slug: "mb_eatx" },
  ],
};

const CPU = {
  name: "CPU Socket",
  slug: "cpu",
  options: [
    { name: "AMD AM2", slug: "cpu_am2" },
    { name: "AMD AM2+", slug: "cpu_am2+" },
    { name: "AMD AM3", slug: "cpu_am3" },
    { name: "AMD AM3+", slug: "cpu_am3+" },
    { name: "AMD AM4", slug: "cpu_am4" },
    { name: "AMD FM1", slug: "cpu_fm1" },
    { name: "AMD FM2", slug: "cpu_fm2" },
    { name: "AMD FM2+", slug: "cpu_fm2+" },
    { name: "Intel LGA 755", slug: "cpu_lga755" },
    { name: "Intel LGA 1150", slug: "cpu_lga1150" },
    { name: "Intel LGA 1151", slug: "cpu_lga1151" },
    { name: "Intel LGA 1155", slug: "cpu_lga1155" },
    { name: "Intel LGA 1156", slug: "cpu_lga1156" },
    { name: "Intel LGA1200", slug: "cpu_lga1200" },
    { name: "Intel LGA1366", slug: "cpu_lga1366" },
    { name: "Intel LGA1700", slug: "cpu_lga1700" },
    { name: "Intel LGA2011", slug: "cpu_lga2011" },
    { name: "Intel LGA2011-V3", slug: "cpu_lga2011v3" },
    { name: "Intel LGA2066", slug: "cpu_lga2066" },
  ],
};

const PCI = {
  name: "PCI",
  slug: "pci",
  options: [
    { name: "PCI-E 2.0 X1", slug: "pci_pcie2x1" },
    { name: "PCI-E 3.0 X1", slug: "pci_pcie3x1" },
    { name: "PCI-E 3.0 X16", slug: "pci_pcie3x16" },
    { name: "PCI-E 4.0 X16", slug: "pci_pcie4x16" },
    { name: "PCI-E 5.0 X16", slug: "pci_pcie5x16" },
  ],
};

const RAM = {
  name: "RAM type",
  slug: "ram",
  options: [
    { name: "DDR3", slug: "ram_ddr3" },
    { name: "DDR4", slug: "ram_ddr4" },
    { name: "DDR5", slug: "ram_ddr5" },
  ],
};

const storage = {
  name: "Storage Ports",
  slug: "storage",
  options: [
    { name: "SATA2", slug: "storage_sata2" },
    { name: "SATA3 ", slug: "storage_sata3" },
    { name: "M2", slug: "storage_m2" },
  ],
};

const PSU = {
  name: "Power Supply",
  slug: "psu",
  options: [
    { name: "ATX", slug: "psu_atx" },
    { name: "FSX", slug: "psu_fsx" },
    { name: "TFX", slug: "psu_tfx" },
  ],
};

const fanMount = {
  name: "Fan Options",
  slug: "fan",
  options: [
    { name: "360mm radiator or 3x120mm fans", slug: "fan_360mm" },
    { name: "240mm radiator or 2x120mm fans", slug: "fan_240mm" },
    { name: "120mm radiator or 1x120mm fan", slug: "fan_120mm" },
  ],
};

const driveBay = {
  name: "Drive Bays",
  slug: "drive",
  options: [
    { name: "2.5in SSD", slug: "drive_2_5in" },
    { name: "3.5in HDD", slug: "drive_3_5in" },
  ],
};

const sockets = [motherboard, CPU, PCI, RAM, storage, PSU, driveBay, fanMount];

// Parts

const parts = [
  {
    name: "Case",
    slug: "case",
    sockets: [motherboard, PSU, fanMount, driveBay],
  },
  { name: "Processor", slug: "cpu", sockets: [CPU] },
  { name: "Graphics Processor", slug: "gpu", sockets: [PCI] },
  {
    name: "Motherboard",
    slug: "motherboard",
    sockets: [motherboard, CPU, PCI, RAM, storage],
  },
  { name: "Memory", slug: "ram", sockets: [RAM] },
  { name: "Storage", slug: "storage", sockets: [storage, driveBay] },
  { name: "Case Cooling", slug: "case_cooling", sockets: [fanMount] },
  { name: "Processor Cooler", slug: "cpu_cooler", sockets: [CPU, fanMount] },
  { name: "Power Supply", slug: "psu", sockets: [PSU] },
];

export default parts;
export { parts, sockets };
