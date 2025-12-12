import classnames from 'classnames';
import React, { FC } from 'react';

export interface ErrorProps {
    statusCode: string | number;
    message: string;
    redirectUrl: string;
}

export const Error: FC<ErrorProps> = ({ statusCode, message, redirectUrl }) => {
    return (
        <div
            className={classnames(
                '[grid-area:main] px-6 mt-8 grid grid-cols-7',
                "[grid-template-areas:'._message_message_message_message_message_.']",
                "md:[grid-template-areas:'._._message_message_message_._.']"
            )}
        >
            <div className="[grid-area:message] flex flex-col gap-4">
                <h2 className="text-xl font-bold">
                    {statusCode}: {message}
                </h2>
                <a href={redirectUrl} className="hover:text-blue-600">
                    <h3 className="text-sm font-semibold leading-snug mb-1 underline">
                        Click here to go to the main site
                    </h3>
                </a>
            </div>
        </div>
    );
};
