import React from "react";
import { useHistory } from "react-router-dom";

import { clearForm, displayCopy, QuickCopy } from "../../storage/question";
import * as repository from "../../storage/repository";
import erro from "../../global/components/prompt/Error";

import * as I from "@styled-icons/boxicons-regular/";
import * as S from "./styled";

const Navbar = ({ isRepoPage }) => {
  let history = useHistory();

  const navButtonList = [
    {
      name: "New repository",
      onClick: () => { newRepository(isRepoPage) },
      icon: <I.AddToQueue />,
    },
    {
      name: "Clear section",
      onClick: () => { clearSection(isRepoPage) },
      icon: <I.Brush />,
    },
    {
      name: "Copy questions",
      onClick: () => { QuickCopy("Questão [number] - [value]") },
      icon: <I.CopyAlt />,
      more: displayCopy,
    },
    {
      name: "Export",
      onClick: repository.exportAll,
      icon: <I.CopyAlt />,
    },
    {
      name: "Repositories",
      onClick: () => { history.push("/repositories") },
      icon: <I.FolderOpen />,
    },
    {
      name: "Open trash",
      onClick: openTrash,
      icon: <I.Trash />
    },
  ];

  if (isRepoPage) {
      navButtonList[4] = {
      name: "Edit repository",
      onClick: () => { history.push("/") },
      icon: <I.Edit />,
    }
  }

  return (
    <S.NavWrapper>
      {navButtonList.map((e) => (
        <S.NavItem name={e.name} title={e.name} key={e.name}>
          <S.NavButton onClick={e.onClick}>
            <S.NavIcon>{e.icon}</S.NavIcon>
            <S.NavText>{e.name}</S.NavText>
          </S.NavButton>
          {e.more && (
            <S.NavMore onClick={e.more}>
              <S.NavMoreIcon>
                <I.RightArrow />
              </S.NavMoreIcon>
            </S.NavMore>
          )}
        </S.NavItem>
      ))}
    </S.NavWrapper>
  );
};

const newRepository = (isRepoPage) => {
  try {
    repository.add();
    localStorage.setItem("repository", "Undefined");
    if (isRepoPage) {
      repository.build();
    } else {
      clearForm();
    }
  } catch (ev) {
    const title = "Error creating a new repository";
    console.error(title, ev);
    erro("errorNewRepository", {
      title: title,
    });
  }
};

const clearSection = (isRepoPage) => {
  try {
    if (isRepoPage) {
      document.getElementById("questionSection").innerHTML = "";
      const prev = localStorage.getItem("repositoryID");
      if (prev) {
        const prevElement = document.getElementById(prev).children[0].style;
        prevElement.border = "1px solid #575f66";
        prevElement.backgroundColor = "var(--back)";
      }
    } else { clearForm() }
  } catch (ev) {}
}

const openTrash = () => {
  const title = "Role in development"
  erro("errorTrash", { title: title })
}

export default Navbar;
