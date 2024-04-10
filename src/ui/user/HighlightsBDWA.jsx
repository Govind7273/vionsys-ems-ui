import React, { useEffect } from 'react'
import { Button, Card } from "antd";
import { useGetBirthdaysFromMonth } from "../../features/users/useGetBirthdaysFromMonth";
const HighlightsBDWA = () => {
    const { birthdays } = useGetBirthdaysFromMonth();
    console.log(birthdays)
    return (
        <Card className="col-span-1 shadow-md">
            <h3>Hello</h3>

        </Card>
    )
}

export default HighlightsBDWA;