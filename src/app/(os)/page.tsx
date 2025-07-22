import Window from './_components/Window';

export default function Page() {
    return (
        <>
            <p className="text-2xl dark:text-green-500">Hello world!</p>
            <Window
                title="새 창"
                size={{ width: 400, height: 300 }}
                position={{ x: 100, y: 100 }}
                id="new-window"
            >
                <p className="text-xl dark:text-green-500">새 창 내용</p>
            </Window>

            <Window
                title="새 창"
                size={{ width: 400, height: 300 }}
                position={{ x: 50, y: 100 }}
                id="new-window"
            >
                <p className="text-xl dark:text-green-500">새 창 내용</p>
            </Window>

            <Window
                title="새 창"
                size={{ width: 400, height: 300 }}
                position={{ x: 40, y: 100 }}
                id="new-window"
            >
                <p className="text-xl dark:text-green-500">새 창 내용</p>
            </Window>
        </>
    );
}
