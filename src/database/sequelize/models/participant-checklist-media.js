const { Model, DataTypes } = require("sequelize");

class ParticipantChecklistMedia extends Model {

    static initModel(sequelize){

        ParticipantChecklistMedia.init({

            id:{
                type: DataTypes.BIGINT,
                autoIncrement:true,
                primaryKey:true
            },

            participant_checklist_media_code:{
                type:DataTypes.STRING(8),
                unique:true,
                allowNull:false
            },

            participant_checklist_code:{
                type:DataTypes.STRING(8),
                allowNull:false
            },

            instagram_media_id:{
                type:DataTypes.STRING(50),
                allowNull:true
            },
            remarks:{
                type:DataTypes.STRING(50),
                allowNull: true,
            },
            remarks_by:{
                type:DataTypes.STRING(8),
                allowNull: true
            },
            status: {
                type:DataTypes.STRING(100),
                allowNull: true
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },

        },{
            sequelize,
            tableName:"participant_checklist_media",
            timestamps:true,
            underscored:true
        });

        return ParticipantChecklistMedia;

    }

    static associate(models){

        ParticipantChecklistMedia.belongsTo(
            models.EventParticipantChecklist,
            {
                foreignKey:"participant_checklist_code",
                targetKey:"participant_checklist_code",
                constraints:false,
                as:"checklist"
            }
        );

    }

}

module.exports = ParticipantChecklistMedia;