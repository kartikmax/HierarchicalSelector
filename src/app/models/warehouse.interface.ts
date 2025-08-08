export interface Zone {
  zoneCode: string;
  name: string;
  description?: string;
}

export interface Section {
  sectionCode: string;
  name: string;
  zoneCode: string;
  description?: string;
}

export interface Shelf {
  shelfCode: string;
  name: string;
  sectionCode: string;
  zoneCode: string;
  description?: string;
}

export interface StorageUnit {
  storageUnitCode: string;
  name: string;
  shelfCode: string;
  sectionCode: string;
  zoneCode: string;
  description?: string;
  capacity?: number;
  currentOccupancy?: number;
}

export interface WarehouseHierarchy {
  zones: Zone[];
  sections: Section[];
  shelves: Shelf[];
  storageUnits: StorageUnit[];
}

export interface LocationSelection {
  selectedZone?: Zone;
  selectedSection?: Section;
  selectedShelf?: Shelf;
  selectedStorageUnit?: StorageUnit;
}
