type Props = {
  children: HTMLLIElement | JSX.Element
}
export const Popup = ({children}: Props) => {
  return <div className='startPanel'>
    <div>
      {children}
    </div>
  </div>
}