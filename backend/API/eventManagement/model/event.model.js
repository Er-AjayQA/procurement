module.exports = (sequelize, Sequelize) => {
  const tbl_event_management = sequelize.define(
    "EVENT_MANAGEMENT",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },

      // BASIC DETAILS
      event_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      event_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      event_start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      event_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      // VENUE INFORMATION
      event_type: {
        type: Sequelize.ENUM("In-Person", "Online", "Hybrid"),
        allowNull: false,
        defaultValue: "In-Person",
      },
      venue_name: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("venue_name", value === "" ? null : value);
        },
      },
      event_address: {
        type: Sequelize.TEXT,
        allowNull: true,
        set(value) {
          this.setDataValue("event_address", value === "" ? null : value);
        },
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("zip_code", value === "" ? null : value);
        },
      },
      event_meet_link: {
        type: Sequelize.STRING,
        allowNull: true,
        set(value) {
          this.setDataValue("event_meet_link", value === "" ? null : value);
        },
      },

      // REGISTRATION
      is_paid: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      sitting_type: {
        type: Sequelize.ENUM("Unlimited", "Limited"),
        allowNull: false,
        defaultValue: "Unlimited",
      },
      sitting_capacity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        set(value) {
          this.setDataValue("capacity", value === "" ? null : value);
        },
      },
      registration_deadline: {
        type: Sequelize.DATEONLY("YYYY-MM-DD"),
        allowNull: true,
        set(value) {
          this.setDataValue(
            "registration_deadline",
            value === "" ? null : value
          );
        },
      },
      base_ticket_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      status: {
        type: Sequelize.ENUM("DRAFT", "PUBLISHED", "CANCELLED", "FINISHED"),
        defaultValue: "DRAFT",
      },
    },
    { freezeTableName: true }
  );
  return tbl_event_management;
};
