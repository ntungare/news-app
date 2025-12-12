import classnames from 'classnames';
import React, { FC } from 'react';

import { useUrlState } from '../../hooks/urlState';
import { formatUrl } from '../../utils/urlFormatter';

export interface PaginationProps {
    previousPageUrl?: string;
    nextPage?: string;
}

export const Pagination: FC<PaginationProps> = ({ previousPageUrl, nextPage }) => {
    const { path, tag, country } = useUrlState();
    const anchorClassNames = classnames(
        'px-4 py-2 rounded-full border text-sm font-medium transition-colors',
        'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
    );

    return (
        (previousPageUrl || nextPage) && (
            <div className="flex flex-row justify-between gap-10">
                {previousPageUrl && (
                    <a
                        href={previousPageUrl}
                        className={classnames(anchorClassNames, 'justify-self-start')}
                    >
                        Previous Page
                    </a>
                )}
                {nextPage && (
                    <a
                        href={formatUrl({ path, params: { tag, country, page: nextPage } })}
                        className={classnames(anchorClassNames, 'justify-self-end')}
                    >
                        Next Page
                    </a>
                )}
            </div>
        )
    );
};
