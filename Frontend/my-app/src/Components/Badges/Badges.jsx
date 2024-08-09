import { children } from "react";
import styled from "styled-components";
import { Caption } from "../Typography-components/Typography";

const StyledBadges = styled.div`
  display: flex;
  padding: var(--spacing-05, 2px) 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 100px;
  border: 2px solid var(--Indigo-400, #818cf8);
  background: var(--Indigo-50, #eef2ff);
`;

function Badges({ children }) {
  return (
    <StyledBadges>
      <Caption className="text-indigo-700">{children}</Caption>
    </StyledBadges>
  );
}

export default Badges;
