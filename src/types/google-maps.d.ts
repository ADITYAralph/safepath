declare global {
  interface Window {
    google: {
      maps: {
        Map: new (element: HTMLElement, options: any) => GoogleMap
        Marker: new (options: any) => GoogleMarker
        Circle: new (options: any) => GoogleCircle
        InfoWindow: new (options: any) => GoogleInfoWindow
        SymbolPath: {
          CIRCLE: number
          FORWARD_CLOSED_ARROW: number
        }
        event: {
          addListener: (instance: any, eventName: string, handler: Function) => void
        }
      }
    }
    initMap?: () => void
  }

  interface GoogleMap {
    panTo(location: { lat: number; lng: number }): void
    setZoom(zoom: number): void
  }

  interface GoogleMarker {
    setMap(map: GoogleMap | null): void
  }

  interface GoogleCircle {
    setMap(map: GoogleMap | null): void
  }

  interface GoogleInfoWindow {
    open(map: GoogleMap, marker: GoogleMarker): void
  }
}

export {}
