import { ActionIcon, List } from "@mantine/core"
import { IconTrash } from "@tabler/icons-react"


interface Props {
  list: string[]
  removeItem: (id: string) => void
}


const NamesList = ({ list, removeItem }: Props) => {


  return (
    <List>
      {list.map((item, i) => (
        <List.Item key={i} style={{ display: "flex", justifyContent: "space-between" }}>
          {item}
          <ActionIcon variant="filled" color="red" size="xs" radius="xs" aria-label="Trashcan" onClick={() => removeItem(String(i))}>
            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </List.Item>
      ))}
    </List>
  )
}


export default NamesList