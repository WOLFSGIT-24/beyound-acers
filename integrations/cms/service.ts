import { WixDataItem } from ".";

export interface PaginationOptions {
  limit?: number;
  skip?: number;
}

export interface RefFieldMeta {
  totalCount: number;
  returnedCount: number;
  hasMore: boolean;
}

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
  hasNext: boolean;
  currentPage: number;
  pageSize: number;
  nextSkip: number | null;
}

export class BaseCrudService {
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    _multiReferences?: Record<string, any>
  ): Promise<T> {
    const newItem = {
      _id: String(Date.now()),
      _createdDate: new Date(),
      _updatedDate: new Date(),
      ...itemData,
    } as T;
    return newItem;
  }

  static async getAll<T extends WixDataItem>(
    collectionId: string,
    _includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[],
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    const limit = pagination?.limit ?? 50;
    const skip = pagination?.skip ?? 0;

    return {
      items: [],
      totalCount: 0,
      hasNext: false,
      currentPage: Math.floor(skip / limit),
      pageSize: limit,
      nextSkip: null,
    };
  }

  static async getById<T extends WixDataItem>(
    _collectionId: string,
    _itemId: string,
    _includeRefs?: { singleRef?: string[]; multiRef?: string[] } | string[]
  ): Promise<T | null> {
    return null;
  }

  static async update<T extends WixDataItem>(_collectionId: string, itemData: T): Promise<T> {
    return itemData;
  }

  static async delete<T extends WixDataItem>(_collectionId: string, _itemId: string): Promise<T> {
    return {} as T;
  }

  static async addReferences(
    _collectionId: string,
    _itemId: string,
    _references: Record<string, string[]>
  ): Promise<void> {}

  static async removeReferences(
    _collectionId: string,
    _itemId: string,
    _references: Record<string, string[]>
  ): Promise<void> {}
}
