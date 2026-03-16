import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    lastName: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
  },
  {
    sequelize, 
    modelName: 'User' 
  }
);

export default User;