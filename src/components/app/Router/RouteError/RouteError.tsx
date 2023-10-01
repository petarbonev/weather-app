import React, { FC, memo, useMemo } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Error from '../../../common/Error/Error';

const RouteError: FC = () => {
    const error = useRouteError();
    const message = useMemo(() => isRouteErrorResponse(error) ? error.statusText : (error as string), [error]);

    return <Error error={message} />;
};

export default memo(RouteError);
