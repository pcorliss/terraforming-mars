import {IProjectCard} from '../IProjectCard';
import {IActionCard, IResourceCard} from '../ICard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {ResourceType} from '../../ResourceType';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {LogHelper} from '../../LogHelper';
import {CardMetadata} from '../CardMetadata';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';

export class AsteroidHollowing implements IActionCard, IProjectCard, IResourceCard {
  public name = CardName.ASTEROID_HOLLOWING;
  public cost = 16;
  public tags = [Tags.SPACE];
  public resourceType = ResourceType.ASTEROID;
  public resourceCount: number = 0;
  public cardType = CardType.ACTIVE;

  public play() {
    return undefined;
  }

  public canAct(player: Player): boolean {
    return player.titanium > 0;
  }

  public action(player: Player) {
    player.titanium -= 1;
    player.addProduction(Resources.MEGACREDITS);
    player.addResourceTo(this);
    LogHelper.logAddResource(player, this);

    return undefined;
  }

  public getVictoryPoints(): number {
    return Math.floor(this.resourceCount / 2);
  }

  public metadata: CardMetadata = {
    cardNumber: 'X13',
    renderData: CardRenderer.builder((b) => {
      b.action('Spend 1 titanium to add 1 asteroid resource here and increase MC production 1 step.', (eb) => {
        eb.titanium(1).startAction.asteroids(1).production((pb) => pb.megacredits(1));
      }).br;
      b.vpText('1VP for each 2 asteroids on this card.');
    }),
    victoryPoints: CardRenderDynamicVictoryPoints.asteroids(1, 2),
  }
}
