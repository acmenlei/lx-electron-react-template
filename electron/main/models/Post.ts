import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db";

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contentType: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    sourceApp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    groupId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    groupName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    editTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "post",
    sequelize,
    createdAt: "createTime",
    updatedAt: "updateTime",
    charset: "utf8",
    collate: "utf8_general_ci",
    indexes: [
      {
        unique: true,
        fields: ["id"],
      },
      {
        fields: ["content"],
      },
      {
        fields: ["title"],
      },
    ],
  }
);

export default Post;
