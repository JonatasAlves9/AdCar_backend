import Car from '../models/Car';

export default {
  render(car: Car) {
    return {
      id: car.id,
      name: car.name,
      brand: car.brand,
      description: car.description,
      gearbox: car.gearbox,
      price: car.price,
    };
  },
  renderMany(cars: Car[]) {
    return cars.map(car => this.render(car));
  },
};
