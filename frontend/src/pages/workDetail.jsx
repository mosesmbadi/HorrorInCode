import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { history } from '../history';
import { Tag } from '../components/tag';
import { PrimaryGithubButton } from '../components/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompleteProject } from '../actions/projectActions';
import { setBackgroundText } from '../actions/pageActions';
import BackArrow from '../components/BackArrow';
import styled from 'styled-components';

const ProjectDetailContainer = styled(motion.article)`
  width: 100vw;
  min-height: 100vh;
  z-index: 3;
  color: white;
  display: grid;

  grid-template-columns: minmax(0, .3fr) .1fr 1fr .1fr minmax(0, .3fr);
  grid-template-rows: .15fr .1fr 1fr;

  grid-template-areas:  "nav nav nav nav nav"
                        "left title title arrow right"
                        "left spc content spcr right";

  overflow: hidden;
  position: relative;
`;

const ContentContainer = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h1`
  grid-area: title;
  z-index: 1;
  font-size: calc(2rem + 2vw);
`;

const ProjectCoverContainer = styled.figure`
  position: relative;
  width: 100%;
  top: -50px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: -20px;
  flex: 1;
  @media (max-width: 420px){
    width: 85%;

    top: -30px;
    margin-bottom: -10px;
  }
`;

const ProjectCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const InlineSectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;

  @media (max-width: 420px){
    padding-left: 10px;
  }
`;

const ProjectDetail = styled.section`
  height: auto;
  min-height: 60px;
  display: ${props => props.tagsSection ? "flex" : "block"};
  padding-left: 2rem;
  margin-top: .6rem;

  &:last-of-type{
    padding-bottom: 40px;
  }
`;


export default function WorkDetail(props) {

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const projectInfo = useSelector(state => state.projects);

  useEffect(() => {
    if (isNaN(projectId))
      history.goBack();
    else
      dispatch(fetchCompleteProject(projectId));
  }, [dispatch, projectId])

  useEffect(() => {
    if (projectInfo) {
      dispatch(setBackgroundText(projectInfo.name))
    }
  }, [dispatch, projectInfo])

  return (
    <ProjectDetailContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ProjectTitle>{projectInfo.name}</ProjectTitle>
      <BackArrow shouldAutoCenter gridPosition={"arrow"} />

      <ContentContainer>
        <ProjectCoverContainer>
          <ProjectCover src={projectInfo.isSingle && `/media/${projectInfo.cover}`} />
        </ProjectCoverContainer>
        <InlineSectionTitle>
          <h2>Technological stack</h2>
          <PrimaryGithubButton href={projectInfo.isSingle && projectInfo.github}>
            Github
          </PrimaryGithubButton>
        </InlineSectionTitle>

        <ProjectDetail tagsSection>
          {
            projectInfo.isSingle &&
            projectInfo.techStack.map(
              tech => <Tag key={tech.id}>{tech.name}</Tag>
            )
          }
        </ProjectDetail>

        <InlineSectionTitle>
          <h2>About the project</h2>
        </InlineSectionTitle>

        <ProjectDetail>
          {
            projectInfo.isSingle &&
            <p>
              {projectInfo.description}
            </p>
          }
        </ProjectDetail>
      </ContentContainer>
    </ProjectDetailContainer>
  )
}