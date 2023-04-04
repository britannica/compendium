import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './CaptionPanel.module.scss';

const CaptionPanel = ({ assembly, CaptionPanelAddons }) => {
  const { title, caption, credit, image, video, audio, interactive, infogram } = assembly;
  const { license } = image || video || audio || interactive || infogram;

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
      {CaptionPanelAddons && (
        <CaptionPanelAddons assembly={assembly} />
      )}
    </div>
  );
};

CaptionPanel.propTypes = {
  assembly: AssemblyProp.isRequired,
  CaptionPanelAddons: PropTypes.func,
};

CaptionPanel.defaultProps = {
  CaptionPanelAddons: null,
};

export default CaptionPanel;
