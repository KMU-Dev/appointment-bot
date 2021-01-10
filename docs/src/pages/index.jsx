import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: '簡單易用',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        掛號對不隊從無到有將最高品質的 Line Bot 呈現於大家面前，使用者僅須向機器人提問，它絕對能提供令人滿意的答案。
      </>
    ),
  },
  {
    title: '專注於重要的事',
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        健康是一切的根本，我們非常重視您提供的症狀資料和隱私，在提供精準的判斷之餘，我們竭盡全力保護您的個人資料。
      </>
    ),
  },
  {
    title: '注入 AI 能量',
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        您說的每一句話潛藏著藝術，我們的 AI 系統會抽絲剝繭，一步步了解每個語句，彷彿閨密一般，懂得您真正的心意。
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
