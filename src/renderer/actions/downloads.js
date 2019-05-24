import { createAction, createRequestTypes, createRequestAction } from 'utils/redux'

export const SEARCH = '@downloads/SEARCH'
export const SEARCH_REQUEST = createRequestTypes('@downloads/SEARCH_REQUEST')
export const DOWNLOAD = '@downloads/DOWNLOAD'
export const DOWNLOAD_REQUEST = createRequestTypes('@downloads/DOWNLOAD_REQUEST')
export const ON_DOWNLOAD_PROGRESS = '@downloads/ON_DOWNLOAD_PROGRESS'
export const ON_DOWNLOAD_ERROR = '@downloads/ON_DOWNLOAD_ERROR'
export const ON_DOWNLOAD_COMPLETE = '@downloads/ON_DOWNLOAD_COMPLETE'

export const constants = {
  DOWNLOAD,
  DOWNLOAD_REQUEST,
  SEARCH,
  SEARCH_REQUEST,
  ON_DOWNLOAD_PROGRESS,
  ON_DOWNLOAD_ERROR,
  ON_DOWNLOAD_COMPLETE
}

export const download = createAction(DOWNLOAD)
export const downloadRequest = createRequestAction(DOWNLOAD_REQUEST)
export const search = createAction(SEARCH)
export const searchRequest = createRequestAction(SEARCH_REQUEST)
export const onDownloadProgress = createAction(ON_DOWNLOAD_PROGRESS)
export const onDownloadError = createAction(ON_DOWNLOAD_ERROR)
export const onDownloadComplete = createAction(ON_DOWNLOAD_COMPLETE)

export default {
  download,
  downloadRequest,
  search,
  searchRequest,
  onDownloadProgress,
  onDownloadError,
  onDownloadComplete
}
