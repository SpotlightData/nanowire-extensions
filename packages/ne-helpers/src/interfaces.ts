export type NullableObject<T> = { [K in keyof T]: T[K] | null };

export type Range<T> = [T, T];

export interface FlattenedPairData {
  value1: string;
  value2: string;
  value2Count: number;
}

export type Leaf<L> = { type: 'leaf' } & L;
export type Branch<B, L> = { type: 'branch'; children: (L | Branch<B, L>)[] } & B;
export type HierarchicalData<B, L> = Leaf<L> | Branch<B, Leaf<L>>;

export interface KeyValue<T, K = string> {
  key: K;
  value: T;
}

export interface KeyValueColor<V> extends KeyValue<V> {
  color: string;
}
