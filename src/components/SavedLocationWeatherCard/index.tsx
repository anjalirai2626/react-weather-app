import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Sunny from "../../common/assets/Sunny.jpeg"
import { useCityWeatherInfo, useWeatherAppState } from '../../react-query-hooks/hooks';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    locationCard: {
        padding: 8,
        minWidth: 300,
        height: 300,
    },
    cardActions: {
        justifyContent: 'space-between'
    },
    media: {
        height: 150,
    },
});

type SavedLocationWeatherCardProps = {
    location: number[];
    isDefault?: boolean;
}

const SavedLocationWeatherCard = ({ location, isDefault }: SavedLocationWeatherCardProps): JSX.Element => {
    const classes = useStyles();
    const { data: defaultLocationData } = useCityWeatherInfo(location);
    const { savedLocation, setSavedLocation, setDetailedLocation } = useWeatherAppState()

    const handleViewDetailedWeatherInfo = (selLocation: number[]) => {
        setDetailedLocation(selLocation)
    }

    const handleRemoveFromSavedLocation = (selLocation: number[]) => {
        let newSavedLocation = JSON.parse(JSON.stringify(savedLocation))
        let selLocationIdx = -1
        savedLocation.forEach((location, idx) => {
            if (JSON.stringify(location) === JSON.stringify(selLocation)) {
                selLocationIdx = idx
            }
        })

        if (selLocationIdx > -1)
            newSavedLocation.splice(selLocationIdx, 1)

        setSavedLocation(newSavedLocation)
    }

    return (
        <Card className={classes.locationCard}>
            <CardMedia
                className={classes.media}
                image={Sunny}
                title="Weather status"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {isDefault ? "My location" : defaultLocationData?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {`${defaultLocationData?.main?.temp} °C`}
                </Typography>
            </CardContent>
            <CardActions classes={{ root: classes.cardActions }}>
                <Link to="/details">
                    <Button size="small" color="primary" onClick={() => handleViewDetailedWeatherInfo(location)}>
                        View more
                    </Button>
                </Link>
                {!isDefault && (
                    <Tooltip title="Remove from saved location" aria-label="remove from saved location">
                        <IconButton aria-label="delete" color="primary" onClick={() => handleRemoveFromSavedLocation(location)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                )}
            </CardActions>
        </Card>
    );
}

export default SavedLocationWeatherCard;
