import { Button, Input, Stack } from "@mui/material";
import { ChangeEvent, FC } from "react";

type Props = {
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
};

const  TextInputArea: FC<Props> = (props) => {
    return (
        <Stack direction="row" spacing={2}>
            <Input
                value={props.value}
                onKeyPress={(event) => {if(event.key === 'Enter'){props.onSubmit()}}}
                onChange={props.onChange}
            />
            <Button variant="contained" onClick={props.onSubmit}>送信する</Button>
        </Stack>
    );
};

export default TextInputArea;