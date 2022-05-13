import {FC} from 'react';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';

type Props = {
    messageList: string[];
};

const MessageList:FC<Props> = (props) => {
    return(
        <Stack>
            {props.messageList.map((message) => {
                return <Box>{message}</Box>
            })}
        </Stack>
    );
};

export default MessageList;