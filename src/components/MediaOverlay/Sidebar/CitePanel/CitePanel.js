import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns'; // todo: switch to day.js
import AssemblyProp from '../../../../prop-types/AssemblyProp';
import styles from './CitePanel.module.scss';

const CitePanel = ({ assembly, localeLabels, CitePanelAddons }) => (
  <div className={styles.CitePanel}>
    <ul>
      {assembly.title && (
        <li>
          <strong>{localeLabels.CITE_MEDIA_TITLE}</strong>
          <div dangerouslySetInnerHTML={{ __html: assembly.title }} />
        </li>
      )}
      <li>
        <strong>{localeLabels.CITE_MEDIA_TYPE}</strong>
        <div dangerouslySetInnerHTML={{ __html: assembly.type }} />
      </li>
      <li>
        <strong>{localeLabels.CITE_WEBSITE_NAME}</strong>
        Encyclop&aelig;dia Britannica
      </li>
      <li>
        <strong>{localeLabels.CITE_PUBLISHER}</strong>
        Encyclop&aelig;dia Britannica
      </li>
      <li>
        <strong>{localeLabels.CITE_URL}</strong>
        <a href={window.location.href}>
          {window.location.href}
        </a>
      </li>
      <li>
        <strong>{localeLabels.CITE_ACCESS_DATE}</strong>
        {format(new Date(), 'MMMM d, yyyy')}
      </li>
    </ul>
    {CitePanelAddons && (
      <CitePanelAddons assembly={assembly} />
    )}
  </div>
);

CitePanel.propTypes = {
  CitePanelAddons: PropTypes.func,
  assembly: AssemblyProp.isRequired,
  localeLabels: PropTypes.shape().isRequired,
};

CitePanel.defaultProps = {
  CitePanelAddons: null,
};

export default CitePanel;
