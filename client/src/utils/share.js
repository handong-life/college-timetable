import JWT from 'jsonwebtoken';

export const getShareLink = (id) => {
  const shareId = JWT.sign(id, process.env.REACT_APP_JWT_SECRET);
  return `${process.env.REACT_APP_DOMAIN_URL}/share/${shareId}`;
};
