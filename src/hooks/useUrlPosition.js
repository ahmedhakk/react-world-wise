import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // [curState, fun => to update the state ] = useSearchParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
