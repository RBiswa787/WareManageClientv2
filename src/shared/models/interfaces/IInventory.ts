export interface Item{
    sku : string,
    qty: number,
    title: string,
    isOccupied : boolean
}
export interface Inventory
    {
        [location : string]  : Item;
    }

export interface ReceivedInventory{
    internalId: {
      
    },
    location: string,
    sku: string,
    title: string,
    qty: 0,
    isOccupied: boolean
  }
