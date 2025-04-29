"use client";

import Image from 'next/image';
import classnames from 'classnames';

import { useDeviceType } from '@hooks/useDeviceType';
import { ZoomInOutlined } from '@ant-design/icons';
import { SstVsTraditionalCardProps } from '@modules/sst/degree/types';
import HorizontalScrollWrapper from '@components/common/HorizontalScroll/HorizontalScroll';

import styles from './SstVsTraditionalCard.module.scss';

const ArticlesCard = ({ articles }: { articles: SstVsTraditionalCardProps['articles'] }) => {
  const { isMobile } = useDeviceType();

  return (
    <>
      {articles?.map((article, index) => {
        const isTextCard = article?.text;

        if (!isTextCard) {
          return (
            <div key={index} className={styles.articleImageCard}>
              <Image
                src={article.image}
                alt={article.alt}
                width={300}
                height={324}
              />
              <div className={styles.zoomIcon}>
                <ZoomInOutlined className={styles.zoomIconIcon} />
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className={styles.articleTextCard}>
              <Image
                src={article.image}
                alt={article.alt}
                width={300}
                height={190}
              />
              <div className={styles.articleText}>
                {article.text}
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default function SstVsTraditionalCard({
  icon,
  altIcon,
  title,
  points,
  articles,
  variant,
}: SstVsTraditionalCardProps) {
  const { isMobile } = useDeviceType();

  const isTextCard = articles?.some((article) => article?.text);
  const isRedCard = variant === 'red';
  const isBlueCard = variant === 'blue';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image src={icon} alt={altIcon} width={80} height={80} className={styles.icon} />

        <div className={styles.infoWrapper}>
          <div className={styles.keyPointsWrapper}>
            <div className={classnames(
              styles.title,
              { [styles.redTitle]: isRedCard },
              { [styles.blueTitle]: isBlueCard }
            )}>
              {title}
            </div>

            <div className={styles.keyPoints}>
              {points.map((point, index) => (
                <div key={index} className={styles.keyPoint}>
                  <div className={styles.keyPointHeading}>{point.heading}</div>

                  {point.subHeading && (
                    <div className={styles.keyPointSubHeading}>
                      {Array.isArray(point.subHeading) ? (
                        <ul className={styles.orderedList}>
                          {point.subHeading.map((subPoint, subIndex) => (
                            <li key={subIndex} className={styles.listItem}>
                              {subPoint}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div>{point.subHeading}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {(!isTextCard || !isMobile) && (
            <HorizontalScrollWrapper slidesToScroll={1} slidesToShow={isMobile ? 1.2 : 1.8}>
              <ArticlesCard articles={articles} />
            </HorizontalScrollWrapper>
          )}
        </div>
      </div>
    </div>
  );
}
