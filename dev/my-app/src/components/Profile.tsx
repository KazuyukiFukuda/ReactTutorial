import { ChangeEvent, FC, useState } from 'react';
import Stack from '@mui/material/Stack';
import TextInputArea from './TextInputArea';
import { Avatar, Card, CardHeader } from '@mui/material';

const Profile: FC = () => {
    type GitHubProfile = {
        login: string;
        name: string;
        avatar_url: string;
        html_url: string;
    }

    const [userName, setUserName] = useState('');
    const [profile, setProfile] = useState<GitHubProfile | undefined>(undefined);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const onSubmit = async () => {
        const response = await fetch(`https://api.github.com/users/${userName}`)
        const data = await response.json();

        if (response.status === 200) {
            setProfile(data);
        } else {
            setProfile({
                login: '',
                name: 'ユーザーの情報が取得できませんでした',
                avatar_url: '',
                html_url: '',
            })
        }
    };

    return (
        <Stack spacing={1}>
            {profile && (
                <Card
                    sx={{
                        width: 300,
                    }}
                    onClick={()=>{window.open(profile.html_url)}}
                >
                    <CardHeader
                        avatar={<Avatar src={profile.avatar_url} />}
                        title={profile.name}
                        subheader={profile.login}
                    />
                </Card>
            )}
            <TextInputArea value={userName} onChange={onChange} onSubmit={onSubmit} />
        </Stack>
    );
};

export default Profile;