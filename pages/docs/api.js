import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

import apis from '../../doc/api'; 


const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps= async () => {
  const spec= createSwaggerSpec(apis);

  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;