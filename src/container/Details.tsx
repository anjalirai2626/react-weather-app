import { useEffect, useState } from 'react';
import DetailView from '../components/DetailView';
import { useWeatherAppState } from '../react-query-hooks/hooks';

const Details = (): JSX.Element => {
    const { detailedLocation } = useWeatherAppState();

    const [showDetail, setShowDetail] = useState<boolean>(false)

    useEffect(() => {
        setShowDetail(Boolean(detailedLocation))
    }, [detailedLocation])

    return showDetail && detailedLocation && detailedLocation?.length ? (
        <DetailView location={detailedLocation} />
    ) : (
        <></>
    )
}

export default Details;