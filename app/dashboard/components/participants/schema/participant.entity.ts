
interface Data {
  name: string
  id: string
  hasParticipated: boolean
}


export default class ParticipantEntity {
  private _name: string
  private _id: string
  private _hasParticipated: boolean

  constructor({ name, id, hasParticipated }: Data) {
    this._name = name
    this._id = id
    this._hasParticipated = hasParticipated
  }


  public get name(): string {
    return this._name
  }

  public get id(): string {
    return this._id
  }

  public get hasParticipated(): boolean {
    return this._hasParticipated
  }

  public toggleParticipation(): ParticipantEntity {
    return new ParticipantEntity({name: this.name, id: this.id, hasParticipated: !this.hasParticipated})
  }


}