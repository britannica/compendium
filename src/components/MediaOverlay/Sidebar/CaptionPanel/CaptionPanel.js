import classNames from 'classnames';
import React from 'react';
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './CaptionPanel.module.scss';

const CaptionPanel = ({ assembly: { title, caption, credit, image, video, audio, interactive } }) => {
  const { license } = image || video || audio || interactive;

  return (
    <div className={classNames(styles.CaptionPanel, 'd-print-none')}>
      <div className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
      <div className={styles.caption} dangerouslySetInnerHTML={{ __html: caption }} />
      {credit && <div className={styles.credit} dangerouslySetInnerHTML={{ __html: credit }} />}
      {license && (
        <a
          href={license.url}
          className={styles.license}
          dangerouslySetInnerHTML={{ __html: license.title }}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
    </div>
  );
};

CaptionPanel.propTypes = {
  assembly: AssemblyProp.isRequired,
};

export default CaptionPanel;
