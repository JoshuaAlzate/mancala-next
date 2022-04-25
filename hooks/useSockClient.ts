import { Stomp } from "@stomp/stompjs";
import { useEffect, useState } from "react";
import { BehaviorSubject } from 'rxjs';
import SockJS from "sockjs-client";

const useSockClient = (url: string) => {
    const [stompData, setStompData] = useState<BehaviorSubject<any>>();

    useEffect(() => {
        const stompSubject = new BehaviorSubject(null);
        setStompData(stompSubject);

        let webSocket = new SockJS(`${process.env.NEXT_PUBLIC_WEB_SOCKET}`);
        let stompClient = Stomp.over(webSocket);
        if (stompClient) {
            stompClient.connect({}, (frame: any) => {

                console.log("connected to the frame: " + frame);
                stompClient.subscribe(url, (response) => {
                    let data = JSON.parse(response.body);
                    stompSubject.next(data);
                });

            });
        }

        return () => {
            stompClient?.disconnect();
            webSocket?.close();
        }
    }, [url]);

    return stompData;
}

export default useSockClient;