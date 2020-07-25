import React from 'react'
import { Card, CardContent,Typography } from "@material-ui/core";
function InfoBox({ title, cases, total}) {
    return (
        <Card className="infoBox">
            <CardContent>
                {/* title */}
                 <Typography clasName="infoBox__title" color = "textsecondary">{title}</Typography>
                {/* +120k number of cases */}
                <h2 className="infoBox__cases">{cases}</h2>
                {/* +1.2M total */}
                <Typography className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
