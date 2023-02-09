import React from 'react';
import { Paper, InputBase, IconButton, Typography, Tooltip } from '@material-ui/core'
import {
    createStyles,
    makeStyles,
    Theme,
} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/HighlightOffRounded';
import { useCitySearch, useCitySearchResults, useWeatherAppState } from '../../react-query-hooks/hooks';
import { COUNTRY_NAMES } from '../../utils/constants';

type CustomSearchProps = {
    onChangeSearch?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onClickSearch?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        searchRoot: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: 350
        },
        inputWrapper: {
            display: 'flex',
            padding: '0 12px',
        },
        cityName: {
            fontWeight: 500,
            margin: '0 !important',
            opacity: 0.7,
        },
        resultsWrapper: {
            minHeight: 200,
        },
        searchContainer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        searchResultItem: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: '6px 12px',
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'none',
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
        },
        errorMsg: {
            padding: '12px 24px',
            opacity: 0.7,
        }
    }),
);

const CustomSearch = ({ onChangeSearch, onClickSearch }: CustomSearchProps): JSX.Element => {
    const classes = useStyles();
    const {
        searchQuery,
        setSearchQuery,
        isSearchDropdownVisible
    } = useCitySearch();

    const { data: cityData, isFetched } = useCitySearchResults(searchQuery);

    const { savedLocation, setSavedLocation } = useWeatherAppState();

    const searchChangeHandler = (e: any) => {
        const query = e?.target?.value;
        if (query) {
            setSearchQuery(query)
        } else {
            setSearchQuery(undefined)
        }

        // component supports onChange handler for custom operations
        if (onChangeSearch)
            onChangeSearch(e)

    }

    const handleAddToSavedLocation = (location: number[]) => {
        setSearchQuery(undefined);
        setSavedLocation([...savedLocation, location]);

    }

    const handleClearSearch = () => {
        setSearchQuery(undefined)
    }

    return (
        <Paper
            component="form"
            className={classes.searchRoot}
        >
            <div className={classes.searchContainer}>
                <div className={classes.inputWrapper}>
                    <InputBase
                        style={{ marginLeft: 1, flex: 1 }}
                        placeholder="Search for a city..."
                        inputProps={{ 'aria-label': 'search for a city' }}
                        value={searchQuery}
                        onChange={searchChangeHandler}

                    />
                    {searchQuery && searchQuery?.length ? (
                        <IconButton style={{ padding: 10 }} aria-label="search" onClick={handleClearSearch}>
                            <ClearIcon />
                        </IconButton>
                    ) : (
                        <IconButton style={{ padding: 10 }} aria-label="search" onClick={onClickSearch}>
                            <SearchIcon />
                        </IconButton>
                    )}

                </div>
                {searchQuery && searchQuery?.length && isSearchDropdownVisible && (
                    <div className={classes.resultsWrapper}>
                        <div className={classes.searchContainer}>
                            {isFetched && cityData?.length ? cityData.map((city: any) => {
                                return (
                                    <Tooltip title="Add to saved location" aria-label="add location">
                                        <div className={classes.searchResultItem} role="button" aria-label="Add to saved location" onClick={() => handleAddToSavedLocation([city?.lat, city?.lon])}>
                                            <Typography className={classes.cityName} color="textSecondary" gutterBottom>
                                                {`${city?.name}, ${COUNTRY_NAMES.of(city?.country)}`}
                                            </Typography>
                                        </div>
                                    </Tooltip>
                                )
                            }
                            ) : (
                                <Typography variant="body2" className={classes.errorMsg}>No search results found, please check your search text or try another city.</Typography>
                            )}
                        </div>
                    </div>)}
            </div>
        </Paper>
    );
}

export default CustomSearch;