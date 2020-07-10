export interface RestaurantModel {
  location: {
    coordinates: number[],
    type: 'Point' | string
  },
  tags?: string[],
  _id?: string,
  name: string,
  address: string,
  __v?: 0
}
