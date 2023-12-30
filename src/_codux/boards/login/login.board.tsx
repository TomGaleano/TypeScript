import { createBoard } from '@wixc3/react-board';
import Login from '../../../components/login';

export default createBoard({
    name: 'Login',
    Board: () => <div>
        <Login />
    </div>,
    isSnippet: true,
    environmentProps: {
        windowWidth: 1120
    }
});
