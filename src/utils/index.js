const mapToDBModel = ({
  id,
  email,
  title,
  deletedAt,
  createdAt,
  updatedAt
}) => ({
  id,
  email,
  title,
  created_at: createdAt,
  updated_at: updatedAt,
  deleted_at: deletedAt,
});

module.exports = mapToDBModel;
